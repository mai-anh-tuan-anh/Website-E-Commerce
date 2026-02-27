import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import MainLayout from '@components/Layout/Layout';

function HeadingListProduct() {
    const targetDate = '2026-08-04T00:00:00';
    return (
        <MainLayout>
            <CountdownTimer targetDate={targetDate} />
        </MainLayout>
    );
}

export default HeadingListProduct;
