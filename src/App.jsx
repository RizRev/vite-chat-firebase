import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Auth } from './components/auth'
import { db,auth,storage } from './config/firebase-config'
import { getDocs,collection,addDoc,deleteDoc,doc,updateDoc } from 'firebase/firestore'
import { ref,uploadBytes } from "firebase/storage"

function App() {
  console.log(auth?.currentUser?.email)
  const [movieList, setMovieList] = useState([])
  const [newMovieTitle,setNewMovieTitle] = useState("")
  const [newReleaseDate,setReleaseDate] = useState(0)
  const [isHororMovie,setIsHororMovie] = useState(false)
  const [updatedTitle,setUpdateTitle] = useState('')
  const [uploadFile,setUploadFile] = useState(null)

  const moviesCollectionRef = collection(db, "Movies")

  useEffect(() => {
    getMovieList()
  },[])

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), 
        id: doc.id
      }))
      setMovieList(filteredData)
      console.log(filteredData)
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        horor: isHororMovie,
        userId: auth?.currentUser?.uid
      })
      getMovieList()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteMovies = async (id) => {
    console.log('delete movies')
    const movieDoc = doc(db,"Movies",id)
    await deleteDoc(movieDoc)
    getMovieList()
  }

  const updateMovieTitle = async (id) => {
    console.log('update movies title')
    const movieDoc = doc(db,"Movies",id)
    await updateDoc(movieDoc,{title: updatedTitle})
    getMovieList()
  }

  const fileUpload = async () => {
    if (!uploadFile) return;
    const filesFolderRef = ref(storage, `projectFiles/${uploadFile.name}` )
    try {
      await uploadBytes(filesFolderRef, uploadFile)
    } catch (error) {
      console.error(error)
    } 
  }
  return (
   <div>
    <Auth/>
    <div>
      <input 
        placeholder='Movie title...'
        onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <input 
        placeholder='Release date...'
        type='number'
        onChange={(e) => setReleaseDate(Number(e.target.value))}
      />
      <input 
      type='checkbox' 
      checked={isHororMovie}
      onChange={(e) => setIsHororMovie(e.target.checked)}
      />
      <label>horor?</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
    </div>
    <div>
      {movieList.map((movie) => (
        <div key={movie.id}>
        <h1 style={{color: movie.horor ? "red":"green"}}>{movie.title}</h1>
        <h3>date : {movie.releaseDate}</h3>
        <button onClick={() => deleteMovies(movie.id)}>Delete Movie</button>
        <input
        placeholder={'New title...'}
        onChange={(e) => setUpdateTitle(e.target.value)}
        />
        <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
        </div>
      ))}
      <input
        type='file'
        onChange={(e) => setUploadFile(e.target.files[0])}
        />
        <button onClick={fileUpload}> Upload Files</button>
    </div>
   </div>
  )
}

export default App
