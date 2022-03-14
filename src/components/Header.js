import PropTypes from 'prop-types'
import Button from './Button'

const Header = ({ title }) => {
  function onClick() {
    console.log('Click');
  }

  return (
    <div>
        <h1>{title}</h1>
        <Button color='green' text='ok' onClick={onClick}/>
    </div>
  )
}

Header.defaultProps = {
  title: 'Task Manager'
}

Header.propTypes = {
  title: PropTypes.string
}

export default Header