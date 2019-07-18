import React from "react"
import Keyboard from "react-simple-keyboard"
import "react-simple-keyboard/build/css/index.css"

export default (props: any) => {
  return (
    <div className="container frw-keyboard">
      <Keyboard
        layoutName="default"
        onKeyPress={(button: string) => props.mobileKeyEvent(button)}
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "z x c v b n m"
          ]
        }}
      />
    </div>
  )
}