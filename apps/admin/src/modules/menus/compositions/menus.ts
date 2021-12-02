import {computed, reactive} from 'vue'
import menusService from '../../../services/menus-service'

import {useSubmitting} from '../../core/compositions/submitting'
import {useDispatcher} from '../../core/compositions/dispatcher'

export function useMenuOperations(menuName: string) {
  const {result: menu} = useDispatcher<{ _id: string, name: string, links: any[] } | any>(() => menusService.getOne(menuName), {})

  const updatedMenu = reactive<{ links: any[], dirty: boolean }>({
    links: [],
    dirty: false
  })
  const links = computed<any[]>(() => updatedMenu.dirty ? updatedMenu.links : (menu.value.links || []))

  return {
    links,
    updateLink: (link) => {
      updatedMenu.links = [...links.value.map(l => l._id === link._id ? link : l)]
      updatedMenu.dirty = true
    },
    removeLink: (link) => {
      updatedMenu.links = [...links.value.filter(l => l !== link)]
      updatedMenu.dirty = true
    },
    addLink: () => {
      updatedMenu.links = [...links.value, {kind: 'category', _id: 'new-' + Date.now()}]
      updatedMenu.dirty = true
    },
    updateMenu: useSubmitting(
      () => menusService.update(menuName, {
        ...menu.value,
        links: links.value
          .map(link => link._id.startsWith('new-') ? {...link, _id: undefined} : link)
      }),
      {success: 'Menu updated successfully', error: 'Failed to update menu'}).submit
  }
}
