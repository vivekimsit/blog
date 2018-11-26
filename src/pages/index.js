import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'

const PostLink = ({ post }) => {
  const title = get(post, 'frontmatter.title') || post.fields.slug
  return (
    <div key={post.fields.slug}>
      <h3 style={{ marginBottom: rhythm(1 / 4) }}>
        <Link style={{ boxShadow: 'none' }} to={post.fields.slug}>
          {title}
        </Link>
      </h3>
      <small>{post.frontmatter.date}</small>
      <p dangerouslySetInnerHTML={{ __html: post.excerpt }} />
    </div>
  )
}

const ReadingList = ({ books, file }) => {
  const readings = books.map(({ title, url, image }) => (
    <a href={url} key={title} target="_blank" style={{ boxShadow: 'none' }}>
      <Img fixed={image.childImageSharp.fixed} />
    </a>
  ))
  return (
    <div>
      <h3 style={{ marginBottom: rhythm(1 / 4) }}>Readings</h3>
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      {readings}
    </div>
  )
}

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges').map(
      ({ node }) => {
        return <PostLink key={node.fields.slug} post={node} />
      }
    )

    const books = get(this, 'props.data.allBooksJson.edges').map(({ node }) => {
      return node
    })

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        <ReadingList books={books} file={this.props.data.file} />
        <h3 style={{ marginBottom: rhythm(1 / 4) }}>Writings</h3>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {posts}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allBooksJson {
      edges {
        node {
          title
          url
          image {
            childImageSharp {
              fixed(width: 200, height: 250) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    file(
      relativePath: { eq: "images/web-scalability-for-startup-engineers.png" }
    ) {
      childImageSharp {
        fixed(width: 200, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
