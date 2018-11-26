import React from 'react'

const InlineSvg = styled.svg`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: inherit;
  fill: currentColor;
`

const SvgWrapper = styled.div`
  display: inline-block;
  flex: 0 0 ${props => (props.size ? `${props.size}px` : '32px')};
  width: ${props => (props.size ? `${props.size}px` : '32px')};
  height: ${props => (props.size ? `${props.size}px` : '32px')};
  min-width: ${props => (props.size ? `${props.size}px` : '32px')};
  min-height: ${props => (props.size ? `${props.size}px` : '32px')};
  position: relative;
  color: inherit;
`

export default (Icon = props => {
  return ({ size = 32, glyph } = props)

  return (
    <SvgWrapper size={size} className="icon">
      <InlineSvg
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={glyph}
        viewBox="0 0 32 32"
        preserveAspectRatio="xMidYMid meet"
        fit
      >
        <title>{glyph}</title>
        <Glyph glyph={glyph} />
      </InlineSvg>
    </SvgWrapper>
  )
})
