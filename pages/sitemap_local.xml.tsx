import { GetServerSideProps } from 'next/types';
import {generate} from '../lib/generate_sitemap';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    res.setHeader('Content-Type', 'text/xml');
    
    const sitemap = await generate('backend', 3000);

    res.write(sitemap);
    res.end();

    return {
        props: {
        }
    }
}

export default () => {}
