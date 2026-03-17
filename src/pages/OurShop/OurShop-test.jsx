import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';

function OurShop() {
    return (
        <div>
            <MyHeader />
            <main style={{ padding: '2rem', minHeight: '80vh' }}>
                <h1>Our Shop - Test Version</h1>
                <p>This is a minimal version to test if the page loads.</p>
            </main>
            <MyFooter />
        </div>
    );
}

export default OurShop;
