import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Radiant Size Chart',
  tagline: 'Algoritmo de recomendación antropométrica respaldado por ANSUR II',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
  },

  url: 'https://docs.radiantsizechart.com',
  baseUrl: '/',

  organizationName: 'radiant-intelligence',
  projectName: 'radiant-size-chart',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/favicon.ico',
        sizes: 'any',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Radiant Size Chart',
      logo: {
        alt: 'Radiant Size Chart Logo',
        src: 'img/logo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Algoritmo',
          items: [
            { label: 'Vision General', to: '/' },
            { label: 'Datos ANSUR II', to: '/algorithm/data-foundation' },
            { label: 'Calculadora', to: '/algorithm/calculator' },
          ],
        },
        {
          title: 'Empresa',
          items: [
            { label: 'Radiant Intelligence', href: 'https://radiantintelligence.com' },
          ],
        },
      ],
      copyright: `Copyright \u00a9 ${new Date().getFullYear()} Radiant Intelligence. Todos los derechos reservados.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
