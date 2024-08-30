
export function useDialog() {

  const calculateTheDistanceToScreen = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    const distance = {
      top: rect.top,
      bottom: window.innerHeight - rect.bottom,
      left: rect.left,
      right: window.innerWidth - rect.right
    }
    return distance
  }

  const collision = (target: HTMLElement) => {
    const sizeOfDialog = 400
    let dialogPositionToRender = { x: 0, y: 0 }

    const targetPosition = target.getBoundingClientRect()
    const positionBottomRight = {
      x: targetPosition.right,
      y: targetPosition.bottom
    }
    const positionBottomLeft = {
      x: targetPosition.left - sizeOfDialog,
      y: targetPosition.bottom
    }

    const positionTopRight = {
      x: targetPosition.right,
      y: targetPosition.top - sizeOfDialog
    }

    const positionTopLeft = {
      x: targetPosition.left - sizeOfDialog,
      y: targetPosition.top - sizeOfDialog
    }

    const { left, bottom, right, top } = calculateTheDistanceToScreen(target)
    // console.log({ left, bottom, right, top })

    /**
     * Evaluar si no cabe en la izquierda, sino, lo renderiza en la parte inferior derecha
     */
    if (left < sizeOfDialog) {
      dialogPositionToRender = { x: positionBottomRight.x, y: positionBottomRight.y }
    }

    /**
     * Evaluar si no cabe en la derecha, sino, lo renderiza en la parte inferior izquierda
     */
    if (right < sizeOfDialog) {
      dialogPositionToRender = { x: positionBottomLeft.x, y: positionBottomLeft.y }
    }

    /**
     * Cuando no cabe abajo, se renderiza en la parte superior izquierda
     */
    if (bottom < sizeOfDialog) {
      dialogPositionToRender = { x: positionTopLeft.x, y: positionTopLeft.y }
    }

    /**
     * Cuando no cabe arriba, pero si abajo
     */
    if (top < sizeOfDialog) {
      dialogPositionToRender = { x: positionBottomRight.x, y: positionBottomRight.y }
    }

    /**
     * Cuando no cabe arriba, ni a la derecha
     */
    if (top < sizeOfDialog && right < sizeOfDialog) {
      dialogPositionToRender = { x: positionBottomLeft.x, y: positionBottomLeft.y }
    }

    /**
     * Cuando no cabe ni abajo, ni a la izquierda, se renderiza en la parte superior derecha
     */
    if (left < sizeOfDialog && bottom < sizeOfDialog) {
      dialogPositionToRender = { x: positionTopRight.x, y: positionTopRight.y }
    }

    /**
     * Cuando no cabe ni abajo, ni arriba a la izquierda, ni tampoco arriba a la derecha,
     * se saca la diferencia y se renderiza en la parte superior izquierda
     */
    if (left < sizeOfDialog && bottom < sizeOfDialog && right < sizeOfDialog) {
      const diff = sizeOfDialog - right + 16
      dialogPositionToRender = { x: positionBottomLeft.x + diff, y: positionTopLeft.y }
    }

    /**
     * Cuando no cabe ni arriba, ni abajo, ni a la izquierda, pero si a la derecha
     */
    if (
      left < sizeOfDialog &&
      top < sizeOfDialog &&
      bottom < sizeOfDialog &&
      right > sizeOfDialog
    ) {
      const diff = sizeOfDialog - top + 16
      dialogPositionToRender = {
        x: positionBottomRight.x,
        y: positionTopLeft.y + diff
      }
    }

    /**
     * Cuando no cabe ni arriba, ni abajo, pero si a la izquierda y derecha
     */
    if (top < sizeOfDialog && bottom < sizeOfDialog) {
      const diff = sizeOfDialog - top + 16
      dialogPositionToRender = {
        x: positionBottomRight.x,
        y: positionTopLeft.y + diff
      }
    }

    /**
     * cuando no cabe ni abajo, ni arriba, ni a la izquierda, pero si a la derecha
     */
    if (
      top < sizeOfDialog &&
      bottom < sizeOfDialog &&
      right < sizeOfDialog &&
      left > sizeOfDialog
    ) {
      const diff = sizeOfDialog - top + 16
      dialogPositionToRender = {
        x: positionBottomLeft.x,
        y: positionTopLeft.y + diff
      }
    }

    /**
     * Cuando cabe en todos lados
     */
    if (
      left > sizeOfDialog &&
      right > sizeOfDialog &&
      top > sizeOfDialog &&
      bottom > sizeOfDialog
    ) {
      dialogPositionToRender = { x: positionBottomRight.x, y: positionBottomRight.y }
    }

    return dialogPositionToRender;
  }

  return { collision }
}