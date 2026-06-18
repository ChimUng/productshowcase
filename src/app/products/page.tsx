import Catalog from '@/components/catalogcomponent/ProductsCatalog';
import Navbarcomponent from '@/components/navbar/Navbar';
import { Metadata } from 'next';

interface PageProps {
  searchParams: Promise<{
    year?: string;
    category?: string[] | string;
    search?: string;
    sortby?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Product Showcase - Danh mục sản phẩm',
        description: 'Tìm kiếm và lọc các sản phẩm công nghệ tối tân',
    };
}

const Page = async ({ searchParams }: PageProps) => {
    const params = await searchParams;

    return (
        <div className="min-h-100vh bg-[#0a0a0f]">
            <Navbarcomponent />
            <div className="max-w-[94%] xl:max-w-[90%] mx-auto pt-[90px]">
                <Catalog
                    searchParams={{
                        year: params.year,
                        category: Array.isArray(params.category) ? params.category : params.category ? [params.category] : [],
                        search: params.search,
                        sortby: params.sortby,
                    }}
                />
            </div>
        </div>
    );
};

export default Page;