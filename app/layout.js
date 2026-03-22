import './globals.css';

export const metadata = {
  title: '右下肢矯正 App',
  description: '右側下肢矯正訓練計畫',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
