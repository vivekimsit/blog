import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'

// Components
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const siteTitle = get(data, 'site.siteMetadata.title')
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with "${tag}"`

  return (
    <Layout title={siteTitle}>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          const {
            frontmatter: { path, title },
            fields: { slug },
          } = node
          return (
            <li key={slug}>
              <Link style={{ boxShadow: 'none' }} to={slug}>
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
      {/*
              This links to a page that does not yet exist.
              We'll come back to it!
            */}
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
