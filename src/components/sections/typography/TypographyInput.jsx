import React from 'react'
import '../../../styles/TypographyInput.css'
import googleFonts from '../../../assets/google-fonts.json'
import { ReactComponent as FontFamilyIcon } from '../../../assets/images/icon-font-family.svg'
import { ReactComponent as FontSizeIcon } from '../../../assets/images/icon-font-size.svg'
import { ReactComponent as FontWeightIcon } from '../../../assets/images/icon-font-weight.svg'
import { ReactComponent as LineHeightIcon } from '../../../assets/images/icon-line-height.svg'
import { ReactComponent as LetterSpacingIcon } from '../../../assets/images/icon-letter-spacing.svg'
import { ReactComponent as ColorIcon } from '../../../assets/images/icon-color.svg'
import { ReactComponent as ItalicIcon } from '../../../assets/images/icon-italic.svg'
import { ReactComponent as FormatResetIcon } from '../../../assets/images/icon-format-reset.svg'

export default class TypographyInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditingTypographyStyleName: false,
      language: this.props.previewLanguage
    }
  }

  delete = () => {
    const { deleteSection, index } = this.props

    deleteSection(index)
  }

  updateTypographyStyles = () => {
    const { updateTypographyStyles } = this.props

    const newTypographyStyleName = `${this.fontSize.value} — ${this.fontFamily.value}`

    updateTypographyStyles({
      typographyStyleName: newTypographyStyleName,
      fontFamily: this.fontFamily.value,
      fontSize: this.fontSize.value,
      fontWeight: this.fontWeight.value,
      lineHeight: this.lineHeight.value,
      letterSpacing: this.letterSpacing.value,
      color: this.color.value
    })
  }

  toggleItalic = () => {
    const { updateTypographyStyles, fontStyle } = this.props

    updateTypographyStyles({
      fontStyle: fontStyle === 'normal' ? 'italic' : 'normal'
    })
  }

  resetFormat = () => {
    this.props.resetTypographyStyles()
  }

  stopEditing = () => {
    this.props.stopEditing()
  }

  startEditingTypographyStyleName = () => {
    this.setState(
      {
        isEditingTypographyStyleName: true
      },
      () => {
        this.typographyNameInput.focus()
      }
    )
  }

  stopEditingTypographyStyleName = () => {
    this.setState({
      isEditingTypographyStyleName: false
    })
  }

  updateTypographyStyleName = () => {
    const { updateTypographyName } = this.props

    updateTypographyName(this.typographyNameInput.value)
  }

  updatePreviewLanguageToKorean = () => {
    const { updatePreviewLanguage } = this.props

    this.setState({
      language: 'ko'
    })

    updatePreviewLanguage('ko')
  }

  updatePreviewLanguageToEnglish = () => {
    const { updatePreviewLanguage } = this.props

    this.setState({
      language: 'en'
    })

    updatePreviewLanguage('en')
  }

  render() {
    const {
      previewText,
      typographyStyleName,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      letterSpacing,
      color,
      fontStyle
    } = this.props

    const { isEditingTypographyStyleName, language } = this.state

    return (
      <section className="typography__input">
        <header className="typography__header">
          <div className="typography__item">
            <span>
              <FontFamilyIcon />
            </span>
            <select
              className="typography__font-family"
              onChange={this.updateTypographyStyles}
              value={fontFamily}
              ref={select => (this.fontFamily = select)}
            >
              {Object.entries(googleFonts).map(([font, { url }], index) => {
                return (
                  <option key={index} value={font}>
                    {font}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="typography__item">
            <span>
              <FontSizeIcon />
            </span>
            <input
              type="text"
              onChange={this.updateTypographyStyles}
              ref={input => (this.fontSize = input)}
              value={fontSize}
              style={{ width: 55 }}
            />
          </div>
          <div className="typography__item">
            <span>
              <FontWeightIcon />
            </span>
            <select
              onChange={this.updateTypographyStyles}
              ref={select => (this.fontWeight = select)}
              value={fontWeight}
            >
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
              <option value="800">800</option>
              <option value="900">900</option>
            </select>
          </div>
          <div className="typography__item">
            <span>
              <LineHeightIcon />
            </span>
            <input
              type="text"
              onChange={this.updateTypographyStyles}
              ref={input => (this.lineHeight = input)}
              value={lineHeight}
              style={{ width: 60 }}
            />
          </div>
          <div className="typography__item">
            <span>
              <LetterSpacingIcon />
            </span>
            <input
              type="text"
              onChange={this.updateTypographyStyles}
              ref={input => (this.letterSpacing = input)}
              value={letterSpacing}
              style={{ width: 60 }}
            />
          </div>
          <div className="typography__item">
            <span>
              <ColorIcon />
            </span>
            <input
              type="text"
              onChange={this.updateTypographyStyles}
              ref={input => (this.color = input)}
              value={color}
              style={{ width: 85 }}
            />
          </div>
          <div className="typography__item">
            <button type="text" onClick={this.toggleItalic}>
              <ItalicIcon />
            </button>
          </div>
          <div className="typography__item">
            <button type="text" onClick={this.props.resetTypographyStyles}>
              <FormatResetIcon />
            </button>
          </div>
        </header>

        <div
          className="typography__preview"
          style={{
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            lineHeight: lineHeight,
            letterSpacing: letterSpacing,
            color: color,
            fontStyle: fontStyle
          }}
        >
          {language === 'en' ? (
            <p>{previewText.en}</p>
          ) : (
            <p>{previewText.ko}</p>
          )}
        </div>

        <footer className="typography__footer">
          {isEditingTypographyStyleName ? (
            <input
              className="typography__summary__input"
              ref={input => (this.typographyNameInput = input)}
              value={typographyStyleName}
              onChange={this.updateTypographyStyleName}
              onBlur={this.stopEditingTypographyStyleName}
            />
          ) : (
            <p
              className="typography__summary"
              onClick={this.startEditingTypographyStyleName}
            >
              {`${typographyStyleName}`}
            </p>
          )}
          <div className="typography__language">
            <div className="typography__language__item">
              <input
                type="radio"
                value="en"
                htmlFor="#en"
                name="language"
                onChange={this.updatePreviewLanguageToEnglish}
                checked={language === 'en' ? true : false}
              />
              <label id="en">English</label>
            </div>
            <div className="typography__language__item">
              <input
                type="radio"
                value="ko"
                htmlFor="#ko"
                name="language"
                onChange={this.updatePreviewLanguageToKorean}
                checked={language === 'ko' ? true : false}
              />
              <label id="ko">한국어</label>
            </div>
          </div>
          <button
            type="submit"
            className="typography__btn"
            onClick={this.props.deleteSection}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="typography__btn"
            onClick={this.stopEditing}
          >
            Save
          </button>
        </footer>
      </section>
    )
  }
}
