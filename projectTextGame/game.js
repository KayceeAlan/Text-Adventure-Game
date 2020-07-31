const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
      optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
      return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a strange room and you see a shiny diamond near you.",
        options: [
            {
                text: "Take the shiny diamond",
                setState: {diamond: true},
                nextText: 2
            },
            {
                text: "Don't take the shiny diamond",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'The room has a portal door which teleports you to a strange town where you come across a merchant.',
        options: [
          {
            text: 'Trade the diamond for a sword',
            requiredState: (currentState) => currentState.diamond,
            setState: { diamond: false, sword: true },
            nextText: 3
          },
          {
            text: 'Trade the diamond for a shield',
            requiredState: (currentState) => currentState.diamond,
            setState: { diamond: false, shield: true },
            nextText: 3
          },
          {
            text: 'Keep the diamond',
            nextText: 3
          }
        ]
      },
      {
        id: 3,
        text: 'After talking with the merchant you see an abandoned castle.',
        options: [
          {
            text: 'Explore the castle',
            nextText: 4
          },
          {
            text: 'Find a room to sleep at in the town',
            nextText: 5
          },
          {
            text: 'Find a stable to sleep in',
            nextText: 6
          }
        ]
      },
      {
        id: 4,
        text: 'You become so tired that you fall asleep while exploring the haunted castle at night and you are killed by a troll while asleep.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 5,
        text: 'You trade the diamond for a room in an inn. After a few hours of sleep the owner of the inn who is a serial killer enters your room and kills you in your sleep.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby haunted castle in daylight.',
        options: [
          {
            text: 'Explore the castle',
            nextText: 7
          }
        ]
      },
      {
        id: 7,
        text: 'While exploring the castle you come across a troll in your path.',
        options: [
          {
            text: 'Run for your life',
            nextText: 8
          },
          {
            text: 'Attack it with your sword',
            requiredState: (currentState) => currentState.sword,
            nextText: 9
          },
          {
            text: 'Hide behind your shield',
            requiredState: (currentState) => currentState.shield,
            nextText: 10
          },
          {
            text: 'Distract it with the shiny diamond',
            requiredState: (currentState) => currentState.diamond,
            nextText: 11
          }
        ]
      },
      {
        id: 8,
        text: 'Your attempts to run are in vain and the troll catches and eats you alive.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 9,
        text: 'You try to kill the troll with your sword but it breaks in battle because the merchant sold you a fake sword.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 10,
        text: 'The troll breaks the shield easily because it is fake and eats you.',
        options: [
          {
            text: 'Restart',
            nextText: -1
          }
        ]
      },
      {
        id: 11,
        text: 'You throw the diamond at the troll and it is distracted. The troll then tries to eat it and explodes. You successfully destroyed the troll with your diamond. Seeing your victory you decide to claim the no-longer haunted castle as your own and live out the rest of your days there.',
        options: [
          {
            text: 'Congratulations. Play Again.',
            nextText: -1
          }
        ]
      }
    
]

startGame()