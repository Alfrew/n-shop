<template>
  <ul class="grid is-col-min-8">
    <li v-for="productGame in productGames" :key="productGame.id" class="cell">
      <game-product-item :product-game="productGame"></game-product-item>
    </li>
  </ul>
</template>

<script setup lang="ts">
import GameProductItem from '../components/GameProductItem.vue';
import { GameProduct } from '../models/GameProduct';

const productGames: GameProduct[] = [
  {
    coverUrl: '',
    description: 'An amazing game',
    id: 'g1',
    imageUrl: 'https://assets.nintendo.eu/image/private/f_auto,c_limit,w_1920,q_auto:low/t_product_tile_mobile/e61ygmjm86tdpfdupd9y',
    name: 'Donkey Kong Country Returns HD',
    price: 59.99,
    type: 'GAME',
  },
  {
    coverUrl: '',
    description: 'An amazing game',
    id: 'g1',
    imageUrl: 'https://assets.nintendo.eu/image/private/f_auto,c_limit,w_1920,q_auto:low/t_product_tile_mobile/fmc8ivqzwhop6vi6jfjm',
    name: 'Mario & Luigi: Fraternauti alla carica',
    price: 59.99,
    type: 'GAME',
  },
  {
    coverUrl: '',
    description: 'An amazing game',
    id: 'g1',
    imageUrl: 'https://assets.nintendo.eu/image/private/f_auto,c_limit,w_1920,q_auto:low/t_product_tile_mobile/p0s7jymrmrdofd1gwpta',
    name: 'Super Mario Party Jamboree',
    price: 59.99,
    type: 'GAME',
  },
  {
    coverUrl: '',
    description: 'An amazing game',
    id: 'g1',
    imageUrl: 'https://assets.nintendo.eu/image/private/f_auto,c_limit,w_1920,q_auto:low/t_product_tile_mobile/fttvzefex2vv5qqgxipk',
    name: 'The Legend of Zelda: Echoes of Wisdom + Wall Scroll Poster',
    price: 72.99,
    type: 'BUNDLE',
  },
  {
    coverUrl: '',
    description: 'An amazing game',
    id: 'g1',
    imageUrl: 'https://assets.nintendo.eu/image/private/f_auto,c_limit,w_1920,q_auto:low/t_product_tile_mobile/awkoqneedtzqxgjzf8ti',
    name: 'The Legend of Zelda: Echoes of Wisdom',
    price: 59.99,
    type: 'GAME',
  },
];
</script>
