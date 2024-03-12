export interface SectionTitle {
  title?: string
  children?: React.ReactNode
}

const SectionTitle: React.FC<SectionTitle> = ({ title, children }) => (
  <h2 className="m-4 flex flex-row flex-nowrap items-center sm:m-8">
    <span className="block grow border-t border-black"></span>
    <span className="mx-0 flex rounded-md bg-black px-4 py-2.5 text-xl font-medium leading-none text-white sm:mx-4">
      {title || children}
    </span>
    <span className="block grow border-t border-black"></span>
  </h2>
)

export default SectionTitle
