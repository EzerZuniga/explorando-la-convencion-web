import NotFound from "@/views/NotFound";

export const metadata = {
  title: "Página no encontrada | Explorando la Convención",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return <NotFound />;
}
