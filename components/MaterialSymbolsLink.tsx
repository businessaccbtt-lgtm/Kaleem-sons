"use client"

export default function MaterialSymbolsLink() {
  return (
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0,1&display=swap"
      media="print"
      onLoad={(e) => {
        (e.target as HTMLLinkElement).media = "all"
      }}
    />
  )
}