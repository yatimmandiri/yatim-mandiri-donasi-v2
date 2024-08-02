export default function ManifestComponent() {
  return {
    name: 'Yatim Mandiri Donasi',
    short_name: 'Ym Donasi',
    description: 'Yatim Mandiri Donasi App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/assets/images/favicon.svg',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/assets/images/favicon.svg',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/favicon.svg',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: '/assets/images/favicon.svg',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/assets/images/favicon.svg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
