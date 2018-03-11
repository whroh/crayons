import React from 'react'
import ColorChip from './ColorChip'
import '../../styles/ColorPaletteSection.css'

class ColorPaletteInput extends React.Component {
  componentDidMount () {
    this.input.focus()
  }

  setInputRef = input => {
    const {
      innerRef,
    } = this.props

    innerRef(input)
    this.input = input
  }

  render () {
    const {
      updateColorInput,
      stopEditing,
    } = this.props

    return (
      <div className='color-palette'>
        <input
          type='text'
          className='color-palette__input'
          placeholder='#ffffff'
          ref={this.setInputRef}
          onChange={updateColorInput}
          onBlur={stopEditing}
        />
        <button
          type='submit'
          className='color-palette__btn'
          onClick={stopEditing}
        >
          Create
        </button>
      </div>
    )
  }
}


class ColorPalette extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: true,
      colors: '',
      colorList: [],
    }
  }

  startEditing = () => {
    this.setState({
      isEditing: true,
    }, () => {
      this.input.value = this.state.colors
    })
  }

  stopEditing = (colors) => {
    const newColorList = this.state.colors.split(',')
      .map(color => color.trim())
      .filter(color => color.length > 0)

    const newColors = newColorList.join(', ')

    console.log(newColorList, newColors)

    if (newColorList.length > 0) {
      this.setState({
        isEditing: false,
        colorList: newColorList,
        colors: newColors,
      })
    } else {
      const {
        deleteSection,
        index
      } = this.props

      deleteSection(index)
    }
  }

  delete = () => {
    const {
      deleteSection,
      index,
    } = this.props

    deleteSection(index)
  }

  updateColorInput = () => {
    this.setState({
      colors: this.input.value,
    })
  }

  updateNewHexCode = (index, hexCode) => {
    const {
      colorList
    } = this.state

    const newColorList = [
      ...colorList,
    ]

    newColorList[index] = hexCode

    this.setState({
      colorList: newColorList,
      colors: newColorList.join(', '),
    })
  }

  render () {
    const {
      colorList
    } = this.state

    return (
      <div>
        {
          this.state.isEditing === true
          ? <ColorPaletteInput
            stopEditing={this.stopEditing}
            updateColorInput={this.updateColorInput}
            innerRef={input => this.input = input}
            />
          : <React.Fragment>
            <div className='color-chips'>
              {
                colorList.map((color, index) => {
                  return <ColorChip
                    key={index}
                    hexCode={color}
                    index={index}
                    updateNewHexCode={this.updateNewHexCode}
                    />
                })
              }
            </div>
            <div className='color-chips__utils'>
              <button
                type='button'
                className='color-chips__btn'
                onClick={this.startEditing}
              >
                Edit
              </button>
              <button
                type='button'
                className='color-chips__btn'
                onClick={this.delete}
              >
                Delete
              </button>
            </div>
          </React.Fragment>
        }
      </div>
    )
  }
}

export default ColorPalette