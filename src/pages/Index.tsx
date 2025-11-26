import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Дверь межкомнатная Мальта',
    price: 12500,
    category: 'Межкомнатные',
    image: 'https://cdn.poehali.dev/projects/1fdc76b1-0c74-47eb-8ae1-ebd7767463ca/files/d97d5193-f4ec-418c-b6cf-032986aebc07.jpg',
    description: 'Элегантная белая дверь со стеклом'
  },
  {
    id: 2,
    name: 'Дверь входная Бастион',
    price: 28900,
    category: 'Входные',
    image: 'https://cdn.poehali.dev/projects/1fdc76b1-0c74-47eb-8ae1-ebd7767463ca/files/c27f4f15-01ef-4b38-b8ac-e4eff8cf1a08.jpg',
    description: 'Надежная входная дверь премиум-класса'
  },
  {
    id: 3,
    name: 'Дверь раздвижная Лайт',
    price: 15800,
    category: 'Раздвижные',
    image: 'https://cdn.poehali.dev/projects/1fdc76b1-0c74-47eb-8ae1-ebd7767463ca/files/dab1e7cb-dac2-46bb-9b51-1000a3d4f927.jpg',
    description: 'Современная раздвижная система из дуба'
  },
  {
    id: 4,
    name: 'Дверь межкомнатная Классика',
    price: 11200,
    category: 'Межкомнатные',
    image: 'https://cdn.poehali.dev/projects/1fdc76b1-0c74-47eb-8ae1-ebd7767463ca/files/d97d5193-f4ec-418c-b6cf-032986aebc07.jpg',
    description: 'Классическая дверь с филенками'
  },
  {
    id: 5,
    name: 'Дверь входная Гранит',
    price: 32500,
    category: 'Входные',
    image: 'https://cdn.poehali.dev/projects/1fdc76b1-0c74-47eb-8ae1-ebd7767463ca/files/c27f4f15-01ef-4b38-b8ac-e4eff8cf1a08.jpg',
    description: 'Усиленная входная дверь с термозащитой'
  },
  {
    id: 6,
    name: 'Дверь раздвижная Модерн',
    price: 17600,
    category: 'Раздвижные',
    image: 'https://cdn.poehali.dev/projects/1fdc76b1-0c74-47eb-8ae1-ebd7767463ca/files/dab1e7cb-dac2-46bb-9b51-1000a3d4f927.jpg',
    description: 'Минималистичная раздвижная конструкция'
  }
];

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = ['Все', 'Межкомнатные', 'Входные', 'Раздвижные'];

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item, index) => index !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Home" size={28} className="text-accent" />
              <h1 className="text-2xl font-bold text-primary">DoorsX</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="text-foreground hover:text-accent transition-colors">Каталог</a>
              <a href="#about" className="text-foreground hover:text-accent transition-colors">О компании</a>
              <a href="#services" className="text-foreground hover:text-accent transition-colors">Услуги</a>
              <a href="#contacts" className="text-foreground hover:text-accent transition-colors">Контакты</a>
            </nav>

            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-accent">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                    <SheetDescription>
                      Товаров в корзине: {cart.length}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {cart.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-accent font-semibold">{item.price.toLocaleString()} ₽</p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeFromCart(index)}
                            >
                              <Icon name="Trash2" size={18} />
                            </Button>
                          </div>
                        ))}
                        <div className="border-t pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-accent">{getTotalPrice().toLocaleString()} ₽</span>
                          </div>
                          <Button className="w-full bg-accent hover:bg-accent/90">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Icon name="Menu" size={24} />
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-4 flex flex-col gap-3 pb-3 border-t pt-3">
              <a href="#catalog" className="text-foreground hover:text-accent transition-colors">Каталог</a>
              <a href="#about" className="text-foreground hover:text-accent transition-colors">О компании</a>
              <a href="#services" className="text-foreground hover:text-accent transition-colors">Услуги</a>
              <a href="#contacts" className="text-foreground hover:text-accent transition-colors">Контакты</a>
            </nav>
          )}
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-accent via-accent to-primary text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Премиум двери для вашего дома
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Эксклюзивная коллекция межкомнатных и входных дверей. Европейское качество. Доставка по всей России.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Icon name="Phone" size={20} className="mr-2" />
                +375 (29) 123-45-67
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: 'Award', title: '15 лет', text: 'на рынке дверей' },
              { icon: 'TrendingUp', title: '5000+', text: 'довольных клиентов' },
              { icon: 'Truck', title: 'Бесплатная', text: 'доставка от 500 ₽' },
              { icon: 'ShieldCheck', title: 'Гарантия', text: 'до 5 лет' }
            ].map((item, index) => (
              <Card key={index} className="text-center border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name={item.icon} size={48} className="mx-auto mb-4 text-accent" />
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Каталог дверей</h2>
          
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-accent hover:bg-accent/90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-accent">{product.price.toLocaleString()} ₽</span>
                  <Button 
                    onClick={() => addToCart(product)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании DoorsX</h2>
              <p className="text-lg text-muted-foreground mb-4">
                DoorsX — премиум-бренд дверей европейского качества. Мы работаем с лучшими производителями 
                Италии, Германии и Швейцарии, предлагая эксклюзивные коллекции для вашего дома.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Каждая дверь — это произведение искусства, сочетающее изысканный дизайн, надежность 
                и экологичность. Индивидуальный подход к каждому клиенту — наш главный приоритет.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Узнать больше
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Наши услуги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: 'Hammer', 
                title: 'Установка дверей', 
                text: 'Профессиональный монтаж любой сложности с гарантией качества' 
              },
              { 
                icon: 'Ruler', 
                title: 'Замер проемов', 
                text: 'Бесплатный выезд специалиста для точных замеров' 
              },
              { 
                icon: 'Palette', 
                title: 'Индивидуальный дизайн', 
                text: 'Изготовление дверей по вашим размерам и эскизам' 
              }
            ].map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <Icon name={service.icon} size={56} className="text-accent mb-4" />
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Частые вопросы</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-none shadow">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Как заказать дверь?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Выберите понравившуюся модель в каталоге, добавьте в корзину и оформите заказ. 
                Наш менеджер свяжется с вами для уточнения деталей.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-none shadow">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Какие сроки изготовления?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Стандартные модели в наличии на складе. Изготовление дверей под заказ занимает от 7 до 14 рабочих дней.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-none shadow">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Предоставляете ли вы гарантию?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Да, на все двери предоставляется гарантия от 2 до 5 лет в зависимости от модели. 
                На работы по установке также действует гарантия 1 год.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-none shadow">
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                Как оплатить заказ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Мы принимаем оплату наличными, банковской картой, безналичным расчетом. 
                Возможна рассрочка до 12 месяцев.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Icon name="MapPin" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                  <p className="text-muted-foreground">г. Москва, Кутузовский пр-т, 36</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Phone" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                  <p className="text-muted-foreground">+375 (29) 123-45-67</p>
                  <p className="text-muted-foreground">+375 (33) 987-65-43</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Mail" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">info@doorsx.ru</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Icon name="Clock" size={24} className="text-accent mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Режим работы</h3>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-muted-foreground">Сб-Вс: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Оставьте заявку</CardTitle>
                <CardDescription>Мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" />
                <Input type="tel" placeholder="Телефон" />
                <Input type="email" placeholder="Email" />
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={24} />
                <h3 className="text-xl font-bold">DoorsX</h3>
              </div>
              <p className="text-white/80">Премиум двери европейского качества с 2015 года</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Каталог</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Межкомнатные двери</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Входные двери</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Раздвижные двери</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Компания</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Услуги</a></li>
                <li><a href="#contacts" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Контакты</h4>
              <ul className="space-y-2 text-white/80">
                <li>+375 (29) 123-45-67</li>
                <li>info@doorsx.ru</li>
                <li>г. Москва, Кутузовский пр-т, 36</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2024 DoorsX. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;