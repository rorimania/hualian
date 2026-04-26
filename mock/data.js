const banners = [
  { id: 1, image: 'https://picsum.photos/seed/sakura/750/320', title: '春の花束特集' },
  { id: 2, image: 'https://picsum.photos/seed/flower1/750/320', title: '新入荷 桜シリーズ' },
  { id: 3, image: 'https://picsum.photos/seed/garden/750/320', title: '母の日ギフト予約受付中' }
]

const categories = [
  { id: 1, name: '玫瑰', icon: '🌹', desc: 'ローズ' },
  { id: 2, name: '百合', icon: '🌸', desc: 'ユリ' },
  { id: 3, name: '向日葵', icon: '🌻', desc: 'ひまわり' },
  { id: 4, name: '混合花束', icon: '💐', desc: 'ミックス' },
  { id: 5, name: '小盆栽', icon: '🌿', desc: '鉢植え' },
  { id: 6, name: '干花', icon: '🏵️', desc: 'ドライフラワー' }
]

const flowers = [
  {
    id: 1,
    name: '桜の恋',
    desc: '桜色の夢のようなバラの花束',
    englishName: 'Sakura Love',
    price: 128,
    originalPrice: 168,
    categoryId: 1,
    images: ['https://picsum.photos/seed/rose1/400/400', 'https://picsum.photos/seed/rose1b/400/400'],
    sales: 520,
    isNew: true,
    isHot: true,
    tag: '人气爆款',
    story: '春風に舞う桜の花びらをイメージした、淡いピンクのバラの花束。初恋のときめきを思い出させます。'
  },
  {
    id: 2,
    name: '星の花束',
    desc: '星空を閉じ込めた青い花束',
    englishName: 'Star Bouquet',
    price: 158,
    originalPrice: 198,
    categoryId: 4,
    images: ['https://picsum.photos/seed/bouquet1/400/400', 'https://picsum.photos/seed/bouquet1b/400/400'],
    sales: 380,
    isNew: true,
    isHot: false,
    tag: '新作',
    story: '夜空に輝く星々を閉じ込めたような、神秘的な青を基調とした花束。特別な人への贈り物に。'
  },
  {
    id: 3,
    name: 'ラベンダー夢',
    desc: 'ラベンダーの香りに包まれて',
    englishName: 'Lavender Dream',
    price: 98,
    originalPrice: 128,
    categoryId: 4,
    images: ['https://picsum.photos/seed/lavender/400/400', 'https://picsum.photos/seed/lavender2/400/400'],
    sales: 420,
    isNew: false,
    isHot: true,
    tag: '推荐',
    story: 'プロバンスのラベンダー畑を想わせる、落ち着いた紫色の花束。心安らぐひとときを。'
  },
  {
    id: 4,
    name: '白ユリの誓い',
    desc: '純白のユリが語る永遠の愛',
    englishName: 'White Lily Promise',
    price: 188,
    originalPrice: 238,
    categoryId: 2,
    images: ['https://picsum.photos/seed/lily/400/400', 'https://picsum.photos/seed/lily2/400/400'],
    sales: 290,
    isNew: false,
    isHot: false,
    tag: '高級',
    story: '気高く美しい白ユリを主役にしたエレガントな花束。永遠の愛と純粋な心を誓います。'
  },
  {
    id: 5,
    name: '青い薔薇の物語',
    desc: '幻の青いバラが紡ぐ奇跡',
    englishName: 'Blue Rose Story',
    price: 168,
    originalPrice: 218,
    categoryId: 1,
    images: ['https://picsum.photos/seed/bluerose/400/400', 'https://picsum.photos/seed/bluerose2/400/400'],
    sales: 340,
    isNew: true,
    isHot: true,
    tag: '限定',
    story: '奇跡といわれる青いバラ。不可能を可能にする想いを込めて、夢を追うあなたへ。'
  },
  {
    id: 6,
    name: '向日葵の夏',
    desc: '太陽のように明るい向日葵',
    englishName: 'Sunflower Summer',
    price: 88,
    originalPrice: 108,
    categoryId: 3,
    images: ['https://picsum.photos/seed/sunflower/400/400', 'https://picsum.photos/seed/sunflower2/400/400'],
    sales: 610,
    isNew: false,
    isHot: true,
    tag: '爆款',
    story: '太陽に向かって真っ直ぐ伸びる向日葵のように、元気と笑顔を届ける花束。'
  },
  {
    id: 7,
    name: 'ピンクの約束',
    desc: '甘く優しいピンクの花々',
    englishName: 'Pink Promise',
    price: 138,
    originalPrice: 178,
    categoryId: 4,
    images: ['https://picsum.photos/seed/pinkbouquet/400/400', 'https://picsum.photos/seed/pink2/400/400'],
    sales: 470,
    isNew: false,
    isHot: false,
    tag: '人気',
    story: 'ピンクの花々が織りなす、甘く優しいハーモニー。大切な人との約束をそっと彩ります。'
  },
  {
    id: 8,
    name: '月下美人',
    desc: '夜に咲く神秘の花',
    englishName: 'Queen of the Night',
    price: 208,
    originalPrice: 268,
    categoryId: 5,
    images: ['https://picsum.photos/seed/moonflower/400/400', 'https://picsum.photos/seed/moonflower2/400/400'],
    sales: 180,
    isNew: true,
    isHot: false,
    tag: 'プレミアム',
    story: '一夜だけ咲く幻の花、月下美人。その神秘的な美しさは、見る者の心を奪います。'
  },
  {
    id: 9,
    name: '花言葉',
    desc: '想いを込めた花言葉の花束',
    englishName: 'Hanakotoba',
    price: 148,
    originalPrice: 188,
    categoryId: 4,
    images: ['https://picsum.photos/seed/mixed/400/400', 'https://picsum.photos/seed/mixed2/400/400'],
    sales: 350,
    isNew: false,
    isHot: false,
    tag: 'ギフト',
    story: '一輪一輪に想いを込めて。花言葉で紡ぐ、世界にひとつだけの花束。'
  },
  {
    id: 10,
    name: '天使の花冠',
    desc: '天使が舞い降りたような花冠',
    englishName: 'Angel Crown',
    price: 238,
    originalPrice: 298,
    categoryId: 2,
    images: ['https://picsum.photos/seed/angel/400/400', 'https://picsum.photos/seed/angel2/400/400'],
    sales: 220,
    isNew: true,
    isHot: true,
    tag: '新作',
    story: '天使の羽根のように優しい白い花々で作られた花冠。花嫁にも人気の逸品。'
  },
  {
    id: 11,
    name: '森の小さな妖精',
    desc: '苔玉と多肉の小さな世界',
    englishName: 'Forest Fairy',
    price: 68,
    originalPrice: 88,
    categoryId: 5,
    images: ['https://picsum.photos/seed/succulent/400/400', 'https://picsum.photos/seed/succulent2/400/400'],
    sales: 560,
    isNew: false,
    isHot: true,
    tag: '人気',
    story: '森の片隅でひっそりと息づく小さな妖精たち。デスクに癒しの空間を。'
  },
  {
    id: 12,
    name: '永遠の桜',
    desc: '色褪せない桜のドライフラワー',
    englishName: 'Eternal Sakura',
    price: 78,
    originalPrice: 98,
    categoryId: 6,
    images: ['https://picsum.photos/seed/drysakura/400/400', 'https://picsum.photos/seed/drysakura2/400/400'],
    sales: 390,
    isNew: false,
    isHot: false,
    tag: '長持ち',
    story: '春の思い出を閉じ込めた、色褪せない桜のドライフラワー。いつまでも美しく。'
  }
]

function getFlowerById(id) {
  return flowers.find(f => f.id === id)
}

function getFlowersByCategory(categoryId) {
  if (!categoryId) return flowers
  return flowers.filter(f => f.categoryId === categoryId)
}

function getHotFlowers() {
  return flowers.filter(f => f.isHot)
}

function getNewFlowers() {
  return flowers.filter(f => f.isNew)
}

module.exports = {
  banners,
  categories,
  flowers,
  getFlowerById,
  getFlowersByCategory,
  getHotFlowers,
  getNewFlowers
}
