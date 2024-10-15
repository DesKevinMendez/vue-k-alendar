import { ref } from "vue"

const openEventsDetailDialog = ref(false)
const dialogPositionToRender = ref({ x: 0, y: 0 })

export function useDialog() {

  const closeDialog = () => {
    openEventsDetailDialog.value = false
  }

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

    const positions = {
      bottomRight: {
        x: targetPosition.right,
        y: targetPosition.bottom
      },
      bottomLeft: {
        x: targetPosition.left - sizeOfDialog,
        y: targetPosition.bottom
      },
      topRight: {
        x: targetPosition.right,
        y: targetPosition.top - sizeOfDialog
      },
      topLeft: {
        x: targetPosition.left - sizeOfDialog,
        y: targetPosition.top - sizeOfDialog
      }
    }

    const { left, bottom, right, top } = calculateTheDistanceToScreen(target)

    const conditionsAndPositions = [
      // Check if it doesn't fit on the left side; if not, render it at the bottom right.
      { condition: left < sizeOfDialog, position: positions.bottomRight },
      // Check if it doesn't fit on the right side; if not, render it at the bottom left.
      { condition: right < sizeOfDialog, position: positions.bottomLeft },
      // Check if it doesn't fit on the top side; if not, render it at the top right.
      { condition: bottom < sizeOfDialog, position: positions.topLeft },
      // Check if it doesn't fit on the bottom side; if not, render it at the top left.
      { condition: top < sizeOfDialog, position: positions.bottomRight },
      // Check if it doesn't fit on top and right; if not, render it at the bottom left.
      { condition: top < sizeOfDialog && right < sizeOfDialog, position: positions.bottomLeft },
      // Check if it doesn't fit on the left and botton; if not, render it at the top right.
      {condition: left < sizeOfDialog && bottom < sizeOfDialog, position: positions.topRight},

    ]

    for (const { condition, position } of conditionsAndPositions) {
      if (condition) {
        dialogPositionToRender = position
      }
    }

    /**
     * Cuando no cabe ni abajo, ni arriba a la izquierda, ni tampoco arriba a la derecha,
     * se saca la diferencia y se renderiza en la parte superior izquierda
     */
    if (left < sizeOfDialog && bottom < sizeOfDialog && right < sizeOfDialog) {
      const diff = sizeOfDialog - right + 16
      dialogPositionToRender = { x: positions.topLeft.x + diff, y: positions.topLeft.y }
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
      dialogPositionToRender = { x: positions.bottomRight.x, y: positions.topLeft.y + diff }
    }

    /**
     * Cuando no cabe ni arriba, ni abajo, pero si a la izquierda y derecha
     */
    if (top < sizeOfDialog && bottom < sizeOfDialog) {
      const diff = sizeOfDialog - top + 16

      dialogPositionToRender = {
        x: positions.bottomRight.x,
        y: positions.topLeft.y + diff
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
        x: positions.bottomLeft.x,
        y: positions.topLeft.y + diff
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

      dialogPositionToRender = { x: positions.bottomRight.x, y: positions.bottomRight.y }
    }

    return dialogPositionToRender;
  }

  return { collision, openEventsDetailDialog, dialogPositionToRender, closeDialog }
}