import { Link } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

export const NotFoundPage = () => {
  return (
    <>
      <SEO
        title="Stranka nenalezena"
        description="Omlouvame se, ale stranka kterou hledate neexistuje nebo byla presunuta."
      />
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <span className="text-8xl font-bold font-display bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                404
              </span>
            </div>
            <h1 className="text-3xl font-bold font-display mb-4">
              Stranka nenalezena
            </h1>
            <p className="text-gray-400 mb-8">
              Omlouvame se, ale stranka kterou hledate neexistuje nebo byla presunuta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.history.back()}>
                Zpet
              </Button>
              <Link to="/">
                <Button variant="secondary">
                  Domovska stranka
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
