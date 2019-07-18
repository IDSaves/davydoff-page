import React, { useState, useEffect, createElement } from "react"
import { Images, ImageType } from "./images"
import "./index.css"
const Granim: any = require("granim")

export default () => {
  const [images, setImages] = useState<ImageType[]>(Images)
  document.title = "Granim With React Example - Davydoff's page"
  document.body.style.background = "white"
  
  useEffect(() => {
    new Granim({
      element: "#canvas-basic",
      name: "basic-gradient",
      direction: "left-right",
      opacity: [1, 1],
      isPausedWhenNotInView: true,
      states : {
        "default-state": {
          gradients: [
              ["#AA076B", "#61045F"],
              ["#02AAB0", "#00CDAC"],
              ["#DA22FF", "#9733EE"]
          ]
        }
      }
    })
  }, [])

  const onLoadImage = (title: string) => {
    let index: number = images.findIndex(image => image.title === title)
    let newImages: ImageType[] = [...images]
    newImages[index].loaded = true
    setImages(newImages)
  }

  const loadNewImage = (title: string) => {
    let index: number = images.findIndex(image => image.title === title)
    let newImages: ImageType[] = [...images]
    newImages[index].image_key = Math.random()
    newImages[index].loaded = false
    setImages(newImages)
  }

  return (
    <div className="App ">
      <canvas id="canvas-basic" />

      <div className="container-fluid mb-5 text-center title">
        <h1 className="canvas-text mt-2 mb-5">GranimJS with ReactJS</h1>
      </div>

      <div className="content container mb-5">
        <div className="row">

          {images.map((image, i) => {
            return(
              <div className="col-lg-3 mt-5" key={i} onClick={() => loadNewImage(image.title)}>
                <div className="content-piece text-center container-fluid">
                  <h1>{image.title}</h1>
                  {!image.loaded ?
                    <div className="img-fluid image-loading mx-auto"></div> : ""
                  }
                  <img 
                    className={!image.loaded ? "img-fluid d-none" : "img-fluid"} 
                    src={"https://picsum.photos/200/300/?random" + image.image_key} 
                    onLoad={() => onLoadImage(image.title)} 
                    alt={`#${i + 1} img`} />
                </div>
              </div>
            )
          })}

        </div>
      </div>

    </div>
  )
}