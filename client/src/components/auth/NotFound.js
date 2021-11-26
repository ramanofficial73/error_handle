import React from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {
    return (
        <div className="notFound">
        <Helmet>
        <title>404 - Not Found</title>
        <meta name="description" content="404 Not Found" />
      </Helmet>
          <div className="notFound_container">
              <h1 className="notFound_h1">
                  404
              </h1>
              <p className="notFound_p">
                      Oops! That page could not Found
                  </p>
          </div>
            
        </div>
    )
}
