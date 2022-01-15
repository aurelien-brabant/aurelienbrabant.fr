import http from 'http'
import { readdirSync, existsSync, lstatSync } from 'fs'
import path from 'path'

const isDir = (path: string) => {
	return existsSync(path) && lstatSync(path).isDirectory()
}

const formatDate = (date: Date) => {
	let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day

	return [year, month, day].join('-')
}

const fetch = (
	apiHost: string,
	apiPort: number,
	route: string
): Promise<any> => {
	const options: http.RequestOptions = {
		hostname: apiHost,
		path: route,
		method: 'GET',
		port: apiPort,
	}

	return new Promise((resolve) => {
		const req = http.request(options, (res) => {
			res.on('data', (data) => {
				try {
					resolve(JSON.parse(data))
				} catch (err) {
					resolve(err)
				}
			})
		})

		req.on('error', (err) => {
			resolve(err)
		})

		req.end()
	})
}

const createSitemapEntry = (
	url: string,
	lastmod: Date = new Date(Date.now()),
	priority: string = '0.5'
) => {
	return `		<url>
			<loc>${url}</loc>
			<lastmod>${formatDate(lastmod)}</lastmod>
			<priority>${priority}</priority>
		</url>
`
}

const createPagesEntries = (): string => {
	const ignored = ['about', '404', '500', 'sitemap', 'sitemap_local'];

	const p = path.join(__dirname, '../pages')
	const pages = readdirSync(p).filter(
		(entry) =>
			!ignored.includes(entry.split('.')[0]) &&
			entry[0] !== '_' &&
			!isDir(path.join(p, entry))
	)

	return pages
		.map((page) => {
			const basename = page.split('.')[0]

			return createSitemapEntry(
				`https://aurelienbrabant.fr/${
					basename === 'index' ? '' : basename
				}`,
				new Date(Date.now()),
				'1.0'
			)
		})
		.join('')
}

const createBlogpostEntries = async (
	apiHost: string,
	apiPort: number
): Promise<string> => {
	const { posts }: { posts: BrabantApi.BlogpostPreview[] } = await fetch(
		apiHost,
		apiPort,
		'/blogposts'
	)

	return posts
		.map((post) =>
			createSitemapEntry(
				`https://aurelienbrabant.fr/blog/${post.stringId}`,
				new Date(post.lastEditTs),
				'0.8'
			)
		)
		.join('')
}

const createProjectEntries = async (
	apiHost: string,
	apiPort: number
): Promise<string> => {
	const projects: BrabantApi.ProjectPreview[] = await fetch(
		apiHost,
		apiPort,
		'/projects'
	)

	return projects
		.map((project) =>
			createSitemapEntry(
				`https://aurelienbrabant.fr/projects/${project.stringId}`,
				new Date(Date.now()),
				'0.5'
			)
		)
		.join('')
}

export const generate = async (apiHost: string, apiPort: number): Promise<string> => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${createPagesEntries()}${await createBlogpostEntries(
		apiHost,
		apiPort
	)}${await createProjectEntries(apiHost, apiPort)}	</urlset>`

	return sitemap;
}
