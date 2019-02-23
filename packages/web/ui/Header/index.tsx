import * as React from 'react'
import Link from 'next/link'
import { Search } from '..'
import { Base } from './styles'

const Header = () => (
  <Base>
    <img src="/static/logo.svg" alt="Wrench" />

    <Search />

    <nav>
      <Link href="/explore">
        <a>Explore</a>
      </Link>
    </nav>
  </Base>
)

export default Header
