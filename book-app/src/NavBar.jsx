import React, { useState } from 'react'; // react kutuphanesi ve hooklar
import { FaShoppingCart } from 'react-icons/fa'; // react icons kutuphanesinden FaShoppingCart simgesini almak icin kullanilir
import './NavBar.css'; // navbar icin still
import Badge from './Badge'; // badge dosyayini ice aktarmak icin 

const NavBar = () => { // const ile NavBar adinda bir degisken atanmis 
    const [cartCount, setCartCount] = useState(0); // carCount baslangic degeri setCartCount degisiklik olacagi zamanki guncellenecegini
    // deger useState 0 ise sifirdan baslandigini temsil eder

    const handleCartClick = (e) => { // const ile handleCartClick adinda bir degisken atanmis (e) parametresi olaylarin detaylarini icerir
        // handleCartClick ise kullanici carta tikladigi zaman ilgili islem gerceklestirilir
        e.preventDefault(); // tarayici tarafindan yapilacak olan varsayilan islemi durdurur ornek vermek gerekirse bir form gonderildiginde
        // submit edildiginde yani sayfanin yeniden yuklenmesini veya bir baglantiya tiklandiginda yeni bir sayfaya yonlendirilmesini engeller
        e.stopPropagation(); // stopPropagation ise diger elementlere dogru yayilmasini engeller ornegin bir ic elemente tiklandiginda
        // dis elementlere dogru yayilmasini engeller 

        console.log('Cart icon clicked'); // consola cart iconuna tiklandi bilgisi gider bu bilgi kullaniciya gitmez 
    };

    const handleAddToCart = () => { // const ile handleAddToCart degiskeni eklenmis karta tiklandigi zaman islem baslar
        setCartCount(cartCount + 1); // sifi olan cartCount a her seferinde +1 ekler bunuda setCartCount ile yapar
    };
// 
    return ( // kodu dondurmeye yarar 
        <nav>
            <div className="container">
                <ul>
                    <li>
                        <a href="/">Home</a> 
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                    <li>
                        <a href="/cart" onClick={handleCartClick}>
                            <FaShoppingCart />
                            <span role="img" aria-label="cart">🛒</span>
                            <Badge count={cartCount} />
                        </a>
                    </li>
                </ul>
            </div> 
        </nav> // ul sirasiz liste li liste icindeki her bir maddeyi temsil eder a bir baglanti link olusturur href ile birlikte kullanilir
        // ve kullaniciyi url e yonlendirir
    );
};

export default NavBar; // disariya aktarmaya yarar bilesen veya deger disarida kullanilir hale gelir
