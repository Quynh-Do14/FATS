import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: [
                    '/profile/',
                    '/FATS/admin/',
                    '/login/',
                    '/register/',
                    '/forgetPassword/'
                ],
                allow: [
                    '/*.js$',
                    '/*.css$',
                    '/*.png$',
                    '/*.jpg$',
                    '/*.jpeg$',
                    '/*.gif$',
                    '/*.pdf$',
                    '/*.doc$',
                    '/*.docx$',

                    '/blog/',
                    '/members/t/join',
                    '/  /',
                ],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'Googlebot',
                allow: '/Register/RegisterGoogle',
            },
        ],
        sitemap: 'https://fats.vn/sitemap.xml',
    }
}