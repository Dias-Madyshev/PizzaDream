import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="135" cy="125" r="121" />
    <rect x="5" y="260" rx="10" ry="10" width="268" height="25" />
    <rect x="-1" y="303" rx="10" ry="10" width="280" height="88" />
    <rect x="6" y="401" rx="20" ry="20" width="95" height="30" />
    <rect x="123" y="400" rx="25" ry="25" width="152" height="35" />
  </ContentLoader>
)

export default Skeleton
