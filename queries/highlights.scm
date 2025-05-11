"func" @keyword.function
["loop" "for"] @keyword.repeat
["if" "elif" "else"] @keyword.conditional
["return"] @keyword.return
["var" "let" "break" "assert"] @keyword
; ["and" "bit_and" "or" "bit_or" "xor" "not" "bit_not"] @keyword.operator
["not" "bit_not"] @keyword.operator
["+" "-" "*" "/" "%" "=" "+=" "-=" "*=" "/=" "%=" "<" ">" "<=" ">=" "==" ] @operator
(builtin_type) @type.builtin
(user_type) @type
(integer_literal) @number
(floating_point_literal) @number.float
(string_literal) @string
(boolean_literal) @boolean
(nil_literal) @keyword
(oneline_comment) @comment
(multiline_comment) @comment
(function_definition name: (identifier) @function)
(variable_declaration name: (identifier) @variable)
(variable_reference_expression) @variable
(function_call callee: (variable_reference_expression) @function.call)
