import "./SectionHeader.scss";
import BreadCrumbs from '@/components/ui/BreadCrumbs/BreadCrumbs'

const SectionHeader = ({
  currentSection,
  currentProduct,
  sectionTitle
}) => {
  return (
    <header className="section-header">
      <div className="inner-header container">
        <BreadCrumbs
          currentSection={currentSection}
          currentProduct={currentProduct}
        />

        <h1 className="section-title">
          {sectionTitle}
        </h1>
      </div>
    </header>
  );
};

export default SectionHeader;