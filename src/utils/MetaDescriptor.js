import React from 'react'
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";


const MetaDescriptor = ({ title, description }) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

MetaDescriptor.protTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default MetaDescriptor