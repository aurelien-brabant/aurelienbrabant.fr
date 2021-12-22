import React, { useState, Fragment } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '../components/container/container'
import styles from '../styles/blog.module.scss'
import { useMediaQuery } from 'react-responsive'

import { Translator } from '../components/translator/Translator'

import Head from 'next/head'

export const getServerSideProps: GetServerSideProps = async function (_content) {
  let blogposts: BrabantApi.BlogpostPreview[] = await (
        await fetch('http://backend:3000/blogposts')
    ).json()

    return {
        props: {
            posts: blogposts,
        },
    }
}

const Blog: React.FC<{ posts: BrabantApi.BlogpostPreview[] }> = ({
    posts,
}) => {
    const [filteredPosts, setFilteredPosts] = useState<BrabantApi.BlogpostPreview[]>(posts)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    const blogLanguageSection = 'blog'

    const isLargeEnoughForHorizontalPosts = useMediaQuery({
        query: '(min-width: 1250px)',
    })

    const selectTag = (tag: string) => {
        if (tag === selectedTag) {
            setSelectedTag(null)
            setFilteredPosts(posts)
        } else {
            setFilteredPosts(
                //posts.filter((post) => post.meta.tags!.includes(tag))
                posts
            )
            setSelectedTag(tag)
        }
    }

    const BlogPostPreview: React.FC<{
        post: BrabantApi.BlogpostPreview,
        vertical: boolean
    }> = ({ post, vertical }) => {
        return (
            <article
                className={`${styles.blogpostPreviewWrapper}
      ${vertical ? styles.vertical : ''}
      `}
            >
                <Link href={`/blog/${post.stringId}`}>
                    <a>
                        <div className={styles.imageBack}>
                            <h3> Click to read </h3>
                            <h5>
                                {' '}
                                about { post.estimatedReadingTime } min. read
                            </h5>
                        </div>
                        <Image
                            layout="fill"
                            src={`/blog/covers/${post.stringId}.webp`}
                            alt={`${post.blogpostId}'s cover image`}
                        />
                    </a>
                </Link>
                <div className={styles.content}>
                    {/*
                    <div className={styles.postTags}>
                        {post.meta.tags &&
                            post.meta.tags.map((tag) => (
                                <span
                                    key={`${post.id}-${tag}`}
                                    className={`${styles.previewTag} ${
                                        selectedTag === tag
                                            ? styles.selected
                                            : ''
                                    }`}
                                >
                                    {' '}
                                    {tag}
                                </span>
                            ))}
                    </div>
                      */}
                    <div>
                        <h3>
                            <Link href={`/blog/${post.blogpostId}`}>
                                <a> {post.title}</a>
                            </Link>
                        </h3>
                        <p>
                            <Link href={`/blog/${post.blogpostId}`}>
                                <a>{post.description}</a>
                            </Link>
                        </p>
                        <div className={styles.metablock}>
                            <Image
                                src={'/aurelien.jpg'}
                                alt={'photo of the author'}
                                width={40}
                                height={40}
                                className={styles.authorImage}
                            />
                            <div>
                                <div style={{ marginBottom: '5px' }}>
                                    {''}
                                    {post.authorUsername}
                                </div>
                                <div>
                                    {' '}
                                    {new Date(post.releaseTs).toLocaleString('en-US')}
                                    {' '}
                                    • {post.estimatedReadingTime} MINUTES
                                    READ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }

    const renderPreviews = () => {
        const previews: React.ReactNode[] = []

        for (let i = 0; i < filteredPosts.length; ) {
            if (!isLargeEnoughForHorizontalPosts || i % 4) {
                let els: BrabantApi.BlogpostPreview[] = []

                if (!isLargeEnoughForHorizontalPosts) els = filteredPosts
                else
                    els = filteredPosts.slice(
                        i,
                        i +
                            (i + 3 >= filteredPosts.length
                                ? filteredPosts.length - i
                                : 3)
                    )

                previews.push(
                    <div
                        className={styles.blogpostsInline}
                        key={`grouped-${i}`}
                    >
                        {els.map((el) => (
                            <BlogPostPreview
                                key={el.blogpostId}
                                post={el}
                                vertical={true}
                            />
                        ))}
                    </div>
                )
                i += els.length
            } else {
                previews.push(
                    <Fragment key={filteredPosts[i].blogpostId}>
                        <BlogPostPreview
                            post={filteredPosts[i]}
                            vertical={false}
                        />
                    </Fragment>
                )
                ++i
            }
        }

        return previews
    }

    return (
        <React.Fragment>
            <Head>
                <title>Blog | Aurelien Brabant</title>
                <meta
                    name="description"
                    content="Blog posts about web development, the GNU/Linux ecosystem, and computer science in general. Come read my programmer stories!"
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://aurelienbrabant.fr/blog`}
                />
            </Head>
            <Container
                className={styles.blogHeaderWrapper}
                limitedWidth={false}
            >
                <Container className={styles.blogHeader}>
                    <h1>
                        <Translator section={blogLanguageSection}>
                            heading
                        </Translator>
                    </h1>
                    <h3>
                        <Translator section={blogLanguageSection}>
                            sub heading
                        </Translator>
                    </h3>
                    <div className={styles.tagList}>
                        {/*
                        {postTags.map((tag) => (
                            <span
                                key={tag}
                                className={`${styles.tag} ${
                                    selectedTag === tag ? styles.selected : ''
                                }`}
                                onClick={() => selectTag(tag)}
                            >
                                {tag}
                            </span>
                        ))}
                        */}
                    </div>
                </Container>
            </Container>
            <Container
                className={styles.mainContainer}
                limitedWidth={false}
                size={'lg'}
            >
                <Container>
                    {/*
        <h2 className={styles.title}> {"Let's have a talk."} </h2>
        <input
          className={styles.searchbar}
          type="text"
          placeholder="Search for something..."
          onChange={(ev) => {
            handleSearch(ev, sanePosts);
          }}
        />
          */}

                    {renderPreviews()}
                </Container>
            </Container>
        </React.Fragment>
    )
}

export default Blog
