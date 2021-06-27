import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icon from '../assets/ic_busca.svg'

const Container = styled.div`
  position: relative;
  img {
    position: absolute;
    top: 6px;
    padding: 15px 30px;
  }
  input[type='text'] {
    width: 50%;
    border: 2px solid #aaa;
    border-radius: 4px;
    margin: 8px 0;
    outline: none;
    padding: 18px;
    box-sizing: border-box;
    transition: 0.3s;
    border-radius: 50px;
    border: 1px solid #fdecec;
    background-color: #fdecec;
    padding-left: 90px;
  }
  input[type='text']:focus {
    outline: none;
    border: 2px solid #f00;
  }
  input[type='text']::-webkit-input-placeholder {
    color: #fa8484;
    font-weight: bold;
  }
`

export default function SearchInput({ value, onChange }) {
  return (
    <Container>
      <img src={icon} alt="icon" />
      <input
        value={value}
        type="text"
        placeholder="Procure por heróis"
        onChange={(e) => onChange(e.target.value)}
      />
    </Container>
  )
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

SearchInput.defaultProps = {
  value: '',
  onChange: () => {}
}
