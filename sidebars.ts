import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  algorithmSidebar: [
    {
      type: 'category',
      label: 'Resumen Ejecutivo',
      collapsed: false,
      items: [
        'algorithm/overview',
        'algorithm/data-foundation',
      ],
    },
    {
      type: 'category',
      label: 'El Algoritmo',
      collapsed: false,
      items: [
        'algorithm/estimation',
        'algorithm/body-shape',
        'algorithm/scoring',
        'algorithm/fit-levels',
      ],
    },
    {
      type: 'category',
      label: 'Validación',
      collapsed: false,
      items: [
        'algorithm/accuracy',
        'algorithm/competitive-analysis',
      ],
    },
    'algorithm/calculator',
  ],
};

export default sidebars;
