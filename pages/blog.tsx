import React, { useState, Fragment } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { Container } from '../components/container/container'
import styles from '../styles/blog.module.scss'

import { Translator, useTranslate } from '../components/translator/Translator'

import Heading from '../components/heading'

import { BsFillRssFill } from 'react-icons/bs'

export const getServerSideProps: GetServerSideProps = async function (
    _content
) {
    let { posts, tags }: BrabantApi.GetBlogposts = await (
        await fetch(
            `http://${process.env.API_HOST}:${process.env.API_PORT}/blogposts`
        )
    ).json()

    return {
        props: {
            posts,
            tags,
        },
    }
}

const Blog: React.FC<{ tags: string[]; posts: BrabantApi.BlogpostPreview[] }> =
    ({ posts, tags }) => {
        const [filteredPosts, setFilteredPosts] =
            useState<BrabantApi.BlogpostPreview[]>(posts)
        const [selectedTag, setSelectedTag] = useState<string>('NONE')
        const [searchText, setSearchText] = useState('')

        const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            const normalized = e.target.value.toLowerCase()
            setSelectedTag('NONE')
            setSearchText(e.target.value)
            setFilteredPosts(
                posts.filter(
                    (post) =>
                        post.title.toLowerCase().includes(normalized) ||
                        post.description.toLowerCase().includes(normalized)
                )
            )
        }

        const blogLanguageSection = 'blog'

        const selectTag = (tag: string) => {
            setSearchText('')
            if (tag === 'NONE') {
                setFilteredPosts(posts)
            } else {
                setFilteredPosts(
                    posts.filter((post) => post.tags!.includes(tag))
                )
            }
            setSelectedTag(tag)
        }

        const BlogPostPreview: React.FC<{
            post: BrabantApi.BlogpostPreview
        }> = ({ post }) => {
            return (
                <Link href={`/blog/${post.stringId}`}>
                    <a className={styles.blogpostLinkWrapper}>
                        <article
                            className={`${styles.blogpostPreviewWrapper} ${styles.vertical}
      `}
                        >
                            <div className={styles.imageWrapper}>
                                <img
                                    src={post.coverImagePath}
                                    alt={`${post.blogpostId}'s cover image`}
                                />
                            </div>
                            <div className={styles.content}>
                                <div>
                                    <h3>{post.title}</h3>
                                    <p>{post.description}</p>
                                </div>
                                <div className={styles.metablock}>
                                    <Image
                                        src={post.authorPictureURI}
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
                                            {new Date(
                                                post.releaseTs
                                            ).toLocaleDateString('en-US')}{' '}
                                            • {post.estimatedReadingTime}{' '}
                                            MINUTES READ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </a>
                </Link>
            )
        }

        return (
            <Fragment>
                <Head>
                    <title>{useTranslate('title', 'blog')}</title>
                    <meta
                        name="description"
                        content={useTranslate('meta_description', 'blog')}
                    />
                    <meta name="robots" content="index, follow" />
                    <link
                        rel="canonical"
                        href={`https://aurelienbrabant.fr/about`}
                    />
                    <link
                        rel="alternate"
                        type="application/rss+xml"
                        title={useTranslate('rss_title', 'blog')}
                        href="/feeds/blog.xml"
                    />

                    <meta
                        property="og:url"
                        content="https://aurelienbrabant.fr/blog"
                    />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:title"
                        content={useTranslate('title', 'blog')}
                    />
                    <meta
                        property="og:description"
                        content={useTranslate('meta_description', 'blog')}
                    />
                    <meta property="og:image" content="/og-landing.webp" />

                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                        property="twitter:domain"
                        content="aurelienbrabant.fr"
                    />
                    <meta
                        property="twitter:url"
                        content="https://aurelienbrabant.fr/blog"
                    />
                    <meta
                        name="twitter:title"
                        content={useTranslate('title', 'blog')}
                    />
                    <meta
                        name="twitter:description"
                        content={useTranslate('meta_description', 'blog')}
                    />
                    <meta name="twitter:image" content="/og-landing.webp" />
                </Head>

                <Heading title="blog" />

                <main className={styles.mainContainer}>
                    <Container>
                        <div className={styles.filteringTools}>
                            <div className={styles.title}>
                                <h2>
                                    <Translator section={blogLanguageSection}>
                                        search_filter
                                    </Translator>
                                </h2>
                                <Link href="/feeds/blog.xml">
                                    <a target="_blank" rel="noreferrer">
                                        <BsFillRssFill />
                                    </a>
                                </Link>
                            </div>
                            <div className={styles.searchInputs}>
                                <input
                                    type="text"
                                    placeholder={useTranslate(
                                        'search_placeholder',
                                        blogLanguageSection
                                    )}
                                    value={searchText}
                                    onChange={handleTextSearch}
                                />
                                <select
                                    name="selectedTag"
                                    value={selectedTag as string}
                                    onChange={(e) => {
                                        selectTag(e.target.value)
                                    }}
                                >
                                    <option value={'NONE'}>NONE</option>
                                    {tags.map((tag) => (
                                        <option
                                            key={tag}
                                            value={tag.toUpperCase()}
                                        >
                                            {tag.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={styles.blogpostsWrapper}>
                            {filteredPosts.map((post) => (
                                <BlogPostPreview
                                    key={post.blogpostId}
                                    post={post}
                                />
                            ))}
                        </div>
                    </Container>
                </main>
            </Fragment>
        )
    }

export default Blog
