import type {Metadata} from "next";
import "../styles/globals.css"

export const metadata: Metadata = {
    title: "IHF Rules Test",
    description: "Train your knowledge of the IHF rules",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <link rel="icon" href="/IHF%20Logo.png" sizes="any"/>
        <body>
        {children}
        </body>
        </html>
    );
}
