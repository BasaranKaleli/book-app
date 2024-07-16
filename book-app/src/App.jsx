import React, { useState, useEffect } from 'react'; // React kutuphanesine erismek icin useState durum yonetimi UseEffect ise useState'i render etmek icin yan etkiler icin(API vb) kullanilan hooklardir 
import axios from 'axios'; // HTTP istekleri yapmak icin (GET, POST vb)
import './App.css'; // App.css icin stil 
import NavBar from './NavBar'; // Navigasyon cubugu bileseni icin
import Book from './Book'; //  Kitap bileseni icin 
import { ToastContainer, toast } from 'react-toastify'; // Bildirim mesaji gondermek icin 
import 'react-toastify/dist/ReactToastify.css'; // Bildirim mesaji icin stil

const API_KEY =  import.meta.env.VITE_API_KEY// Anahtar

const App = () => { // App adinda bir bilesen tanimlanmis 
  // Arrow Function ise syntax icin tek bir satida calisir
  const [query, setQuery] = useState('flowers inauthor:keyes'); // bir array'in icersinde 2 tane ifade var birincisi baslangic degeri "query"
  // ikincisi ise baslangic degeri degisecegi zamanki alacagi deger "setQuery"
  // flowers inauthor: keyes ise serach bar uzerinde kullanicinin gorecegi ornek bir deger
  const [books, setBooks] = useState([]); // ayni sekilde "books" baslangic degeri setBooks ise degisecegi zamanki deger 
  // "[]" icinin bos olma sebebi ise baslangicta bos bir dizi olarak tanimlanmis "[]" baslangicta herhangi bir veri olmadigini kullanici
  // arama yaptigi zaman kitaplar eklenerek guncellenecegini gosterir
  const [error, setError] = useState(''); // string'in icinin bos olma sebebi baslangicta herhangi bir hata mesaji olmadigini ve herhangi
  // bir hata durumunda bu stringin setError ile guncellenecegini gosterrir

  useEffect(() => { // useEffect useState'in kodlarini render etmeye yarar 
    searchBooks(); // searchBooks ise aramaya yarar 
  }, []); // sayfa ilk acildigi zaman render eder herhangi bir state degisikligi olmadigi surece yalnizca bilesen ilk kez acildiginda render eder
  // eger icine bir seyler yazmis olsaydik belirli state veya prop degisikligi oldugu zaman calisirdi ornek vermek gerekirse
  // array icerine query yazsaydik bu sefer query statesi degistigi zaman calisacakti

  const searchBooks = async () => { // bu kod asenkron calisir islemler sira ile degil birbirinden bagimsiz 'const searchBooks' ile degisken atanmis
    try { // try hata yonetimi icin kullanilir kod calisir eger bir hata olursa carch blogu  devreye girer ve bu sekilde hata mesaji ekrana yazdirilir
      const response = await axios.get( // get almak demek axios get ise HTTP istegi ile almak demek google apisine gonderir
        // await ise asenkron islemin bitmesini bekler const response ise response adinda bir degisken atanmis
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}` // google linki sorguya gidiyor &key=${API_KEY} ise apikeye gidiyor 
      );

      if (response.data.items && response.data.items.length > 0) { // if eger demek "response.data.items.length > 0" bir kontrol ifadesidir
        // dizinin uzunlugu 0 dan buyuk olup olmadigi kontrol eder api den gelen mesaj da en az 1 eleman varsa if blogu calisir
        // "response" HTTP isteginden donen cevap data response icinde bulunan veriyi temsil eder items ise apiden gelen kitap 
        // data ve items arasindaki farklar ise data http istegi sonucunda donen veri items ise datanin icersinde kitaplari temsil eder
        setBooks(response.data.items); // api den gelen veri ile books guncellenir 
        setError(''); // Eger kitap bulunursa hata mesaji gostermez
      } else { // if kosulu saglanamazsa else blogu calisir 
        setBooks([]); // guncellenme olur ama kitap bulunamadigi zaman ekrana eski kitaplar gosterilmez o yuzden array in ici bos
        setError('No books found.'); // hata mesaji 
      }
    } catch (error) { // hata yakalama yakalandigi zaman error'a gonderir yani bir alt satira
      console.error('Error fetching books:', error); // hata mesaji sadece console de gosterilir kullaniciya gosterilmez 
      setBooks([]); // array bos olarak ayarlanmistir hata durumu oldugunda kullaniciya mevcut kitaplar gosterilmez setBooks olarak 
      // yazilmasinin sebebi ise guncellemek icin 
      setError('Error fetching books. Please try again later.'); // kullaniciya gosterilecek olan hata mesaji 
    }
  };

  const handleSearch = (e) => { // const ile handleSearch adinda bir degisken atanmis handleSearch atindigi seylere tiklatmaya yariyor
    // ornek vermek gerekirse handleButton olsaydi button'a tiklatmaya yariyacakti burada kullanma amaci ise searchBar'a tiklatmak
    // (e) bilgi vermek kullanici etkilesimlerini takip etmek olayin nerede nasil gerceklestigini anlamak icin kullanilir nereye tiklandi
    // ne yaptildi vs. 
    e.preventDefault(); // preventDefult varsayilan davranisi engellemek icin kullanilir 
    searchBooks(); // kitaplari aramak icin 
  };

  const handleAddToCart = (book) => { // const ile handleAddToCart diye bir degisken atanmis handleAddToCart tiklayinca karta kitap eklmeye yarar
    // "(book)" ile olur bu 
    console.log('Sepete eklendi:', book.volumeInfo.title); // console kismina sepeti eklendi bilgisini verir kullaniciya vermez
    toast.success(`${book.volumeInfo.title} added to cart`, { // bildirim gonderdigi zaman carta eklendi bilgisi gider
      position: "bottom-right", // bildirim mesaji pozisyonu pozisyon olarak sag alt tarafta 
      autoClose: 3000, // bildirimi otomatik olarak 3000 birim sonra kapatmaya yarar
      hideProgressBar: false, // cubugun kapanacagi sureyi gostermeyi acar
      closeOnClick: true, // bildirimin uzerine tiklayinca kapatmaya yarar
      pauseOnHover: true, // fare ile bildirimin uzerine geldigi zaman bildirim suresini durdurur
      draggable: true, // saga sola suruklenebilir ve belirli bir suruklenme esigini astiktan sonra bildirim kaybolur
    });
  };

  return ( // return dondurmek 
    <div className="App">
      <NavBar />
      <h1>Google Books Search</h1>
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text" // app adinda className atanmis classNameler css de bir sinifi ya da bir elemani duzenlemek icin kulalnilir
            // NavBar bilesenini cagirmak icin kullanilir h1 baslik ayni sekilde css icin search container cagirmis 
            // formlar kullanici girisleri icin kullanilir ornek vermek gerekirse input submit button vb onSubmit event gerceklestiginde
            // calisacak olan olayi betimler 
            // input kullanici girisi icin type tur demek turu yazi  onsubmit gondermek demek form kullanici girisi onsubmit gondermek 
            // handlesearch ise calisacak olan olay isleyicisini temsil eder 
            // tekrar anlatiyom form kullanici girisi onSubmit gonderme islemi handleSearch ise bir isleyici
            value={query} // 
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter book title or author"
          /> 
          <button type="submit">Search 🔍</button> 
        </form>
      </div> 
      {error && <p className="error-message">{error}</p>}
      <div className="books-container">
        {books.map((book) => ( // value {query} input alaninin mevcut degerini query degiskenine baglar mevcut deger query dir
        // onChange inputta herhangi bir degisiklik oldugu zaman tetikler onChange inputta bir degisiklik oldugu zaman calisir 
        // setQuery ile guncelleme e.target.value ile mevcut deger placeholder kullaniciyi yonlendirmek icin kullanilan arac
        // lutfen buraya mesaj giriniz kismi gibi bir sey tiklayinca gidiyor
        // searcb buttonu olusturulmus form ile de kullanici girisi kapanmis
        // && kosul operatoru soldaki ifade dogru olmasi durumunda sagdaki ifadeyi degerlendirir error dogru ise error message yazdirilir
        // .map dizi icersindeki her bir elemani alarak islem yapilabilir ornek vermek gerekirse const number [1,2,3,4,5]
        // const doubleNumbers = numbers.map(num=> num * 2); doubleNumbersin icerigi [2,4,6,8,10] yeni bir dizi olusturur
          <Book key={book.id} book={book} onAddToCart={handleAddToCart} /> 
          // book her bir kitap ogesini gorsel olarak temsil eder bu gorseller uzerinden kullanici etkilesimlerine yanit vermek icin kullanilir
          // key = {book.id} kitap ogelerine benzersiz kimlikler tanimlanir book = {book} her bir kitap ogesinin nasil gosterilecegini belirler
          // baslik yazar yayinevi vs onAddtoCart kullanici kitap ogesine tiklayarak sepete eklemek icin handleAddToCart kullanici etkilesimleri icin
          // Toast bildirim pozisyon sag alt otomatik kapanma
        ))}
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} /> 
    </div> 
  );
};

export default App;
// disariya baska modullere sunmaya yarar bilesen veya deger baska yerlerde kullanilabilir hale gelir 