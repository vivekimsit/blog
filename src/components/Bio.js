import React from 'react'
import styled from 'styled-components'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import { SocialIcon } from 'react-social-icons'

import profilePic from './profile-pic.png'
import { rhythm } from '../utils/typography'

const IconListContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  a {
    margin-right: 10px;
    box-shadow: none;
  }
`

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: rhythm(2.5),
        }}
      >
        <div style={{ display: 'flex', marginBottom: rhythm(1) }}>
          <img
            src={profilePic}
            alt={`Vivek Poddar`}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              width: rhythm(2),
              height: rhythm(2),
            }}
          />
          <p style={{ marginBottom: 0 }}>
            Written by <strong>Vivek Poddar</strong> who lives and works in
            Cambridge building useful things.{' '}
          </p>
        </div>
        <IconListContainer>
          <SocialIcon url="http://twitter.com/vivekimsit" />
          <SocialIcon url="http://github.com/vivekimsit" />
          <SocialIcon url="http://linkedin.com/in/vivekpoddar" />
        </IconListContainer>
      </div>
    )
  }
}

export default Bio
