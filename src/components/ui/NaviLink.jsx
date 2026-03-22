import { Link } from '@chakra-ui/react'
import { NavLink } from 'react-router'

export function NaviLink({ to='/', children }) {
  return (
    <Link
      to={to}
      as={(props) => (
        <NavLink
          {...props}
          style={({ isActive }) => {
            return { fontWeight: isActive ? 700 : 400 }
          }}
        />
      )}
    >
      {children}
    </Link>
  )
}

export default NaviLink
