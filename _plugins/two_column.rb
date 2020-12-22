module Jekyll
  module Tags
    class TwoColumn < Liquid::Block
      def initialize(tag_name, block_options, liquid_options)
        super
      end

      def render(context)
        context.stack do
          @content = super
        end
        site = context.registers[:site]
        converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
        content = converter.convert(super)
        
        output = %(<div class="library-entry">#{content}</div>)

        output
      end
    end
  end
end

Liquid::Template.register_tag('twocolumn', Jekyll::Tags::TwoColumn)
