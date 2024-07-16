import React, { useState } from 'react'; // react kutuphanesi ve hooklari ice aktarmak icin
import './Book.css'; // kitaplarin stilleri icin

const Book = ({ book, onAddToCart, onRemoveFromCart }) => { // book adinda bir segiken atanmis book apiden gelen veriyi temsil eder
// book kitabin bilgilerini gostermek icin onAddToCart sepete eklemek icin onRemoveFromCart sepetten cikarmak icin kullanilir
    const [stockCount, setStockCount] = useState(0); // const ile stockCount ve setStockCount adinda degisken atanmi stockCount baslangic
    // degeri baslangic degeri 0 cunku useState de oyle yaziyor setStockCount ise guncellendigi zaman degisiklik yapacagi arac yani 1 
    // oldugu zaman degistircek olan fonksiyon

    const handleAdd = () => { // const adinda handleAdd adinda bir degisken eklenmis dugme tiklamasi yapildigi zaman tetiklemek icin
        setStockCount(stockCount + 1); // stockCount arttikca birer birer arttirmaya yarar
        onAddToCart(book); // karta ne ekelemen gerektigini soyler kitap  
    };

    const handleRemove = () => { // const ile handleRemove adinda bir degisken atanmistir handleRemove dugme tiklamasini yapildigi zaman tetiklemek icin
        if (stockCount > 0) { // eger count 0 dan buyukse cikarma islemini yapar yani - 1 -2 olmasin diye
            setStockCount(stockCount - 1); // ayni sekilde setStockCount ile guncelleme yapilir birer birer cikarilir
            onRemoveFromCart(book); // cikarilan sey kitap
        }
    };

    return ( // kodu dondurur
        <div className="book"> 
            <img // book adinda bir className olusturulmus still icin 
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192.png?text=No+Image'} // src kaynak
                // book.volume.info api ile kitp hakkinda bilgi verir yazari baslik vb imagelinks resim baglantisi thumbnasil ise resim
                // aradaki soru isareti ise opsiyonel zincirleme ozelligini kullanarak imagelinks nesnesinin icindeki thumbnail ozelligine
                // guvenilir bir sekilde erismeyi saglar eger volumeinfo veya image.links de nesnelerinden birisi tanimli degilse 
                // thumbnail undefined olur 
                alt={book.volumeInfo.title} // alt alternatif metin bir metin veya bir gorsel yuklenmedigi zaman onun yerine yuklenecek olan 
                // alternatif metindir
            />
            <div className="book-details">
                <h2>{book.volumeInfo.title}</h2>
                <p>{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p> 
                <div className="button-container">
                    <button className="button add" onClick={handleAdd}>
                        Add to Cart
                    </button> 
                    <button className="button remove" onClick={handleRemove}>
                        Remove from Cart
                    </button>
                        <span className="badge">{stockCount}</span>
                </div> 
            </div>
        </div> // "||" ike veya daha fazla ifadenin birbirinden bagimsiz bir sekilde dogrulugunu kontrol eder iki taraftan en az bir tanesi
        // dogru ise sonuc true olur 
        // span stillemek ve belirli basli ozellikler kazandirmak icin kullanilir jsx icinde ise metin icerigini gostermek icin kullanilir
        // stockCount badge ifadesinin sifirdan baslandigini temsil eder
    );
};

export default Book; // disariya baska modullere sunmak icin kullanilir bilesen veya deger baska yerlerde kullanilabilir hale gelir
