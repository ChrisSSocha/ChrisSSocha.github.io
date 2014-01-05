require 'sass'

class SassConverter
  attr_accessor :sassPath
  attr_accessor :inputFile
  attr_accessor :outputFile

  def initialize(sassPath, fileName)
    @sassPath = sassPath
    @inputFile = "#{sassPath}#{fileName}.scss"
    @outputFile = "#{sassPath}#{fileName}.css"
  end

  def convert()
    begin
      puts "Performing Sass Conversion."

      File.open(inputFile, 'r') do |input|
        contents = input.read

        engine = Sass::Engine.new(contents, :syntax => :scss, :load_paths => [sassPath], :cache => false)

        File.open(outputFile,  'w') do |output|
          output.write(engine.render)
        end
      end

    rescue StandardError => e
      puts "SASS Error: " + e.message
    end
  end
end

sassConverter = SassConverter.new('./assets/css/', 'main')
sassConverter.convert();
