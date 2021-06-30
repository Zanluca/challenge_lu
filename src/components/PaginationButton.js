import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  display: flex;
  font-size: 25px;
`

const Button = styled.button`
  background-color: transparent;
  border: none;
  font-size: 25px;
`

export default function PaginationButton({ prevClick, nextClick, page }) {
  return (
    <Container>
      <Button type="button" onClick={prevClick}>
        {'<'}
      </Button>
      {page}
      <Button type="button" onClick={nextClick}>
        {'>'}
      </Button>
    </Container>
  )
}

PaginationButton.propTypes = {
  prevClick: PropTypes.func,
  nextClick: PropTypes.func,
  page: PropTypes.number
}

PaginationButton.defaultProps = {
  prevClick: () => {},
  nextClick: () => {},
  page: 1
}
