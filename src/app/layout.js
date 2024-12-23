import { League_Spartan } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import "../app/assets/scss/style.scss"
import "../app/assets/css/materialdesignicons.min.css"
import { AntdRegistry } from '@ant-design/nextjs-registry'

const league = League_Spartan({ 
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-league',
 })

export const metadata = {
  title: 'ICM - EMPLOYMENT CENTER',
  description: 'ICM - EMPLOYMENT CENTER',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <AntdRegistry><body className={league.variable}>{children}</body></AntdRegistry>
    </html>
  )
}
