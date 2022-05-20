import { FaQuestion } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function AboutIconLink() {
  return (
    <div className='about-link'>
      <Link to='/about'>
        <FaQuestion size={30} />
      </Link>

      {/*
       * Adding extra parameters to a link
       */}
      {/* <Link
        to={{
          pathname: '/about',
          search: '?sort=name',
          hash: '#link',
        }}>
        <FaQuestion size={30} />
      </Link> */}
    </div>
  )
}

export default AboutIconLink
