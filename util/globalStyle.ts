import { NO_SCROLL } from '~/util/static'

export const toggleBodyOverflow = (bool: boolean) => {
  const classList = document.body.classList
  bool ? classList.add(NO_SCROLL) : classList.remove(NO_SCROLL)
}
