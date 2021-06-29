import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icon from '../assets/ic_busca.svg'
import iconSmall from '../assets/ic_busca_menor.svg'

const Container = styled.div`
  position: relative;
  width: 50%;
  img {
    position: absolute;
    top: 6px;
    padding: 15px 30px;
  }
  input[type='text'] {
    width: 100%;
    border-radius: 4px;
    margin: 8px 0;
    outline: none;
    padding: ${(props) => (props.size === 'normal' ? '18px' : '15px')};
    box-sizing: border-box;
    transition: 0.3s;
    border-radius: 50px;
    border: ${(props) =>
      props.size === 'normal' ? '1px solid #fdecec' : '1px solid #FFF'};
    background-color: ${(props) =>
      props.size === 'normal' ? '#fdecec' : '#fFF'};
    padding-left: ${(props) => (props.size === 'normal' ? '90px' : '70px')};
  }
  input[type='text']:focus {
    outline: none;
    border: ${(props) =>
      props.size === 'normal' ? '2px solid #f00' : '1px solid #000'};
  }
  input[type='text']::-webkit-input-placeholder {
    color: ${(props) => (props.size === 'normal' ? '#fa8484' : '##8c8c8c')};
    font-weight: bold;
  }
`

export default function SearchInput({ value, onChange, size, onKeyDown }) {
  return (
    <Container size={size}>
      <img src={size === 'normal' ? icon : iconSmall} alt="icon" />
      <input
        value={value}
        type="text"
        placeholder="Procure por heróis"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </Container>
  )
}

SearchInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'normal']),
  onKeyDown: PropTypes.func
}

SearchInput.defaultProps = {
  value: '',
  onChange: () => {},
  size: 'normal',
  onKeyDown: () => {}
}
